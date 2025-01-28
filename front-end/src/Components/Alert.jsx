/* eslint-disable react/prop-types */
const Alert = ({smg}) => {
    return <div className="bg-red-500 text-white p-2 rounded-md mt-6 text-sm">
        <i className="fa-solid fa-circle-exclamation pr-2"></i>{smg}
    </div>
}

export default Alert;