import { useEffect, useRef } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const { handleChange, errors, isValid, resetForm } = useFormAndValidation({});

  const inputRef = useRef('');

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      inputRef.current.value = '';
    }
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({
        avatar: inputRef.current.value,
      });
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'avatar'}
      title={'Обновить аватар'}
      buttonName={'Сохранить'}
      buttonLoading={'Сохранение...'}
      isValid={isValid}
      isLoading={isLoading}
    >
      <div className="form__field">
        <input
          ref={inputRef}
          className={`form__input ${errors.avatar && 'form__input_type_error'}`}
          onChange={handleChange}
          id="input-avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className={`form__error ${!isValid && 'form__error_visible'}`}>{errors.avatar}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
