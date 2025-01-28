/*************************************  Get all books  ************************************/

const getBooks =  async () => {
    const res = await fetch('/api/books')
    const data = await res.json()

    if(!res.ok) {
        throw Error(data.error)
    }

    return data
}

export { getBooks }