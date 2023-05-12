import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({});

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddPlace(values);
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={'add'}
      title={'Новое место'}
      buttonName={'Создать'}
      buttonLoading={'Создание...'}
      isValid={isValid}
      isLoading={isLoading}
    >
      <div className="form__field">
        <input
          value={values.name || ''}
          onChange={handleChange}
          className={`form__input ${errors.name && 'form__input_type_error'}`}
          id="input-name"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30" />
        <span className={`form__error ${!isValid && 'form__error_visible'}`}>{errors.name}</span>
      </div>
      <div className="form__field">
        <input
          value={values.link || ''}
          onChange={handleChange}
          className={`form__input ${errors.link && 'form__input_type_error'}`}
          id="input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required />
        <span className={`form__error ${!isValid && 'form__error_visible'}`}>{errors.link}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
