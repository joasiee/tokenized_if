import requests
import hashlib
import json
import random

lsp_api = "http://localhost:3000/api/"
imp_api = "http://localhost:3001/api/"
fin_api = "http://localhost:3002/api/"

shipments = []

def createItems(descriptions, amounts):
    res = []
    for d,a in zip(descriptions, amounts):
        res.append({"description": d, "amount": a})

def createShipment(id, owner, uuid, items):
    ret = {
        "id": id,
        "owner": owner,
        "cargo": {
            "uuid": uuid,
            "items": items
        },
        "cargo_hash": "5"
    }
    return ret


def addShipment(shipment):
    r = requests.post(lsp_api+"shipments/", data=shipment)
    return r.status_code

def addShipments():
    descriptions = []
    amounts = []
    id
    for i in range(25):
        descriptions.append(f"item {i}")
        amounts.append(i)
    items = createItems(descriptions[:10],amounts[:10])
    ship = createShipment(1,"isabel",1, items)
    shipments.append(ship)
    print(addShipment(ship))
    items = createItems(descriptions[10:],amounts[10:])
    ship = createShipment(2,"isabel",2, items)
    shipments.append(ship)
    print(addShipment(ship))

def offer(id, price, buyback):
    payload = {"price": price, "buyback": buyback}
    r = requests.put(imp_api+f"shipments/{id}", data=payload)
    print(r.status_code)

def main():
    # addShipments()
    offer(1, 10, 20)
    





if __name__ == '__main__':
    main()
