import PropTypes from 'prop-types';

const Book = ({book, children}) => {

    return <div className="mb-4">
        <div className="flex items-start justify-between">
            <div>
                <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">
                    {book.title}
                </h2>
                <p className="text-[10px] text-slate-500">
                    {new Date(book.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div>{children}</div>

        </div>
        <p className="text-sm mt-4">{book.writer}</p>
        <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500/70 to-indigo-50 mt-6">
        </div>
    </div>
}

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        createdAt: PropTypes.string,
        body: PropTypes.string,
        writer: PropTypes.string,
    })
};

export default Book;