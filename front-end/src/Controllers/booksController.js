/*************************************  Get all books  ************************************/

const getBooks = async () => {
    const res = await fetch('/api/books')
    const data = await res.json()

    if (!res.ok) {
        throw Error(data.error)
    }

    return data
}

/*************************************  Get user books  ************************************/

const getUserBooks = async () => {
    const res = await fetch('/api/books/user', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    // ตรวจสอบว่า API ส่ง email กลับมาหรือไม่
    if (!data.email) {
        data.email = localStorage.getItem("email"); // ใช้ email จาก localStorage หาก API ไม่ส่งกลับมา
    }

    return data;
}

/*************************************  Create books  ************************************/
 const createBook = async (title, writer, price) => {
     if (!title || !writer || !price) {
         throw Error('All fields are required');
     }

     const res = await fetch('/api/books', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('token')}`
         },
         body: JSON.stringify({
             title,
             writer,
             price,
         })
     })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}

/*************************************  Delete books  ************************************/
const deleteBook = async (_id) => {
    const res = await fetch(`/api/books/${_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}

/*************************************  Update books  ************************************/
const updateBook = async (_id, title, writer, price) => {
    if (!title || !writer || !price) {
        throw Error('All fields are required');
    }

    const res = await fetch(`/api/books/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title,
            writer,
            price,
        })
    })
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}
export { getBooks, getUserBooks, createBook, deleteBook, updateBook }