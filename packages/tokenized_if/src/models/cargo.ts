export interface Cargo {
    uuid: string,
    items: CargoItem[],
}

export interface CargoItem {
    description: string,
    amount: number,
}