import ReactModal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

// Bind modal to your appElement for accessibility
ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, title, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-auto my-16 focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
      </div>
      <div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;