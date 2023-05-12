import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen, onClose, onConfirm, cardToDelete, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(cardToDelete);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'confirm'}
      title={'Вы уверены?'}
      buttonName={'Да'}
      buttonLoading={'Удаление...'}
      isValid={'true'}
      isLoading={isLoading}
    />
  )
}

export default ConfirmationPopup;
