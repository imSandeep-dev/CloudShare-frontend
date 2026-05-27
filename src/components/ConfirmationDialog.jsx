import Modal from "./Modal"

const ConfirmationDialog = (
    {
        isOpen,
        onClose,
        title="Confirm Action",
        message="Are you sure want to proceed?",
        confirmText="Confirm",
        cancelText="Cancel",
        onConfirm,
        confirmationButtonClass = "bg-red-600 hover:bg-red-700",
    }
) => {
    return(
        <div className="">
            <Modal isOpen={isOpen}
                onClose={onClose}
                title={title}
                confirmText={confirmText}
                cancelText={cancelText}
                onConfirm={onConfirm}
                size="sm"
                confirmationButtonClass={confirmationButtonClass}
            >
                <p className="text-gray-600">{message}</p>
            </Modal>
        </div>
    )
}

export default ConfirmationDialog