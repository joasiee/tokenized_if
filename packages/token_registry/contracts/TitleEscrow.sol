pragma solidity ^0.5.16;

import "./ERC721.sol";
import "./ITitleEscrow.sol";
import "./ITitleEscrowCreator.sol";

contract HasNamedBeneficiary is Context {
  address public beneficiary;

  constructor(address _beneficiary) internal {
    beneficiary = _beneficiary;
  }

  modifier onlyBeneficiary() {
    require(isBeneficiary(), "HasNamedBeneficiary: only the beneficiary may invoke this function");
    _;
  }

  function isBeneficiary() internal view returns (bool) {
    return _msgSender() == beneficiary;
  }
}

contract HasHolder is Context {
  address public holder;

  event HolderChanged(address indexed previousHolder, address indexed newHolder);

  constructor(address _holder) internal {
    holder = _holder;
    emit HolderChanged(address(0), _holder);
  }

  modifier onlyHolder() {
    require(isHolder(), "HasHolder: only the holder may invoke this function");
    _;
  }

  function isHolder() internal view returns (bool) {
    return _msgSender() == holder;
  }

  function _changeHolder(address newHolder) internal {
    require(newHolder != address(0), "HasHolder: new holder is the zero address");
    emit HolderChanged(holder, newHolder);
    holder = newHolder;
  }
}

contract TitleEscrow is Context, ITitleEscrow, HasNamedBeneficiary, HasHolder, ERC165 {
  event TitleReceived(address indexed _tokenRegistry, address indexed _from, uint256 indexed _id);
  event TitleCeded(address indexed _tokenRegistry, address indexed _to, uint256 indexed _id);
  event TransferOwnerApproval(uint256 indexed _tokenid, address indexed _from, address indexed _to);
  event TransferTitleEscrowApproval(address indexed newBeneficiary, address indexed newHolder);

  // ERC165: Interface for this contract, can be calculated by calculateSelector()
  // Only append new interface id for backward compatibility
  bytes4 private constant _INTERFACE_ID_TITLEESCROW = 0xdcce2211;

  enum StatusTypes {Uninitialised, InUse, Exited}
  StatusTypes public status = StatusTypes.Uninitialised;

  // Information on token held
  ERC721 public tokenRegistry;
  uint256 public _tokenId;
  uint256 public tokenPrice;
  uint256 public buyBackPrice;

  // Factory to clone this title escrow
  ITitleEscrowCreator public titleEscrowFactory;

  // For exiting into title escrow contracts
  address public approvedBeneficiary;
  address public approvedHolder;

  // For exiting into non-title escrow contracts
  address public approvedOwner;

  // Destination to transfer token to, after purchase
  address public contractDest;

  //TODO: change ERC721 to address so that external contracts don't need to import ERC721 to use this
  constructor(
    ERC721 _tokenRegistry,
    address _beneficiary,
    address _holder,
    address _titleEscrowFactoryAddress
  ) public HasNamedBeneficiary(_beneficiary) HasHolder(_holder) {
    tokenRegistry = ERC721(_tokenRegistry);
    titleEscrowFactory = ITitleEscrowCreator(_titleEscrowFactoryAddress);
    _registerInterface(_INTERFACE_ID_TITLEESCROW);
  }

  // 'Fallback function'. It is used to receive ethers, and call the buyBackToken or buyToken afterwards.
  // If sender is beneficiary, then he wants to buy back the token.
  // If not, then it is an financer that wants to buy the token.
  function() external payable {
    if (msg.sender == beneficiary) {
      buyBackToken();
    } else {
      buyToken();
    }
  }

  // Sets the token deal to trade it. The prices and destination are fixed, and cannot be changed anymore after it is set in the contract.
  // Note that only the holder can set this deal.
  function setTokenDeal(
    uint256 price,
    uint256 price2,
    address dest
  ) public isHoldingToken onlyHolder {
    require(tokenPrice == 0, "TitleEscrow setTokenDeal: Cannot adjust tokenPrice after set");
    require(buyBackPrice == 0, "TitleEscrow setTokenDeal: Cannot adjust buyBackPrice after set");
    require(contractDest == address(0), "TitleEscrow setTokenDeal: Cannot adjust contractDest after set");
    tokenPrice = price;
    buyBackPrice = price2;
    contractDest = dest;
  }

  // Gets the token deal that was set before and returns it.
  function getTokenDeal()
    public
    view
    isHoldingToken
    returns (
      uint256,
      uint256,
      address
    )
  {
    return (tokenPrice, buyBackPrice, contractDest);
  }

  // Gets the token price that was set before.
  function getTokenPrice() public view returns (uint256) {
    return tokenPrice;
  }

  // Gets the buy back price that was set before.
  function getBuyBackPrice() public view returns (uint256) {
    return buyBackPrice;
  }

  // Gets the destination address (the new holder), so after payment the holder will change to this new address.
  function getContractDest() public view returns (address) {
    return contractDest;
  }

  // Returns the ether balance stored in the contract.
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  // Buying a token. If the buyer had paid more than was set, the remaining funds will be transferred back.
  // After payment, the holder is immediately changed to contractDest. And the beneficiary receives the money.
  function buyToken() public payable isHoldingToken {
    require(tokenPrice > 0, "TitleEscrow buyToken: tokenPrice was not set, thus you cannot buy");
    require(msg.value >= tokenPrice, "TitleEscrow buyToken: have not received enough funds to buy the token");

    if (msg.value > tokenPrice) {
      msg.sender.send(msg.value - tokenPrice);
    }

    address payable payable_beneficiary = address(uint160(beneficiary));
    payable_beneficiary.send(tokenPrice);
    _changeHolder(contractDest);
  }

  // Buying back the token. This function is called by the importer.
  // After payment, the importer will immediately become the new holder of the token.
  function buyBackToken() public payable isHoldingToken {
    require(buyBackPrice > 0, "TitleEscrow buyBackToken: buyBackPrice was not set, thus you cannot buy");
    require(
      msg.value >= buyBackPrice,
      "TitleEscrow buyBackToken: have not received enough funds to buy back the token"
    );
    require(msg.sender == beneficiary, "TitleEscrow buyBackToken: only beneficiary can buy back the token");

    if (msg.value > buyBackPrice) {
      msg.sender.send(msg.value - buyBackPrice);
    }

    address payable payable_holder = address(uint160(holder));
    payable_holder.send(buyBackPrice);
    _changeHolder(beneficiary);
  }

  function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
  ) external returns (bytes4) {
    require(status == StatusTypes.Uninitialised, "TitleEscrow: Contract has been used before");
    require(
      _msgSender() == address(tokenRegistry),
      "TitleEscrow: Only tokens from predefined token registry can be accepted"
    );
    _tokenId = tokenId;
    emit TitleReceived(_msgSender(), from, _tokenId);
    status = StatusTypes.InUse;
    return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
  }

  function changeHolder(address newHolder) public isHoldingToken onlyHolder {
    _changeHolder(newHolder);
  }

  modifier allowTransferOwner(address newOwner) {
    require(newOwner != address(0), "TitleEscrow: Transferring to 0x0 is not allowed");
    if (holder != beneficiary) {
      require(newOwner == approvedOwner, "TitleEscrow: New owner has not been approved by beneficiary");
    }
    _;
  }

  modifier allowTransferTitleEscrow(address newBeneficiary, address newHolder) {
    require(newBeneficiary != address(0), "TitleEscrow: Transferring to 0x0 is not allowed");
    require(newHolder != address(0), "TitleEscrow: Transferring to 0x0 is not allowed");
    if (holder != beneficiary) {
      require(newBeneficiary == approvedBeneficiary, "TitleEscrow: Beneficiary has not been endorsed by beneficiary");
      require(newHolder == approvedHolder, "TitleEscrow: Holder has not been endorsed by beneficiary");
    }
    _;
  }

  modifier isHoldingToken() {
    require(_tokenId != uint256(0), "TitleEscrow: Contract is not holding a token");
    require(status == StatusTypes.InUse, "TitleEscrow: Contract is not in use");
    require(tokenRegistry.ownerOf(_tokenId) == address(this), "TitleEscrow: Contract is not the owner of token");
    _;
  }

  function approveNewOwner(address newOwner) public isHoldingToken onlyBeneficiary {
    emit TransferOwnerApproval(_tokenId, beneficiary, newOwner);
    approvedOwner = newOwner;
  }

  function _transferTo(address newOwner) private {
    status = StatusTypes.Exited;
    emit TitleCeded(address(tokenRegistry), newOwner, _tokenId);
    tokenRegistry.safeTransferFrom(address(this), address(newOwner), _tokenId);
  }

  function transferTo(address newOwner) public isHoldingToken onlyHolder allowTransferOwner(newOwner) {
    _transferTo(newOwner);
  }

  function transferToNewEscrow(address newBeneficiary, address newHolder)
    public
    isHoldingToken
    onlyHolder
    allowTransferTitleEscrow(newBeneficiary, newHolder)
  {
    address newTitleEscrowAddress =
      titleEscrowFactory.deployNewTitleEscrow(address(tokenRegistry), newBeneficiary, newHolder);
    _transferTo(newTitleEscrowAddress);
  }

  function approveNewTransferTargets(address newBeneficiary, address newHolder) public onlyBeneficiary isHoldingToken {
    require(newBeneficiary != address(0), "TitleEscrow: Transferring to 0x0 is not allowed");
    require(newHolder != address(0), "TitleEscrow: Transferring to 0x0 is not allowed");

    emit TransferTitleEscrowApproval(newBeneficiary, newHolder);

    approvedBeneficiary = newBeneficiary;
    approvedHolder = newHolder;
  }
}
