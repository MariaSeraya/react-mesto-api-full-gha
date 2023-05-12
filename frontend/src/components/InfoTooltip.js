import Popup from "./Popup";
import SuccessIcon from '../images/popup-tooltip-success.svg';
import ErrorIcon from '../images/popup-tooltip-error.svg';

function InfoTooltip ({ isOpen, onClose, isRegister }) {
  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    name={'tooltip'}>
      <div className="popup__tooltip-container">
        <img src={isRegister ? SuccessIcon : ErrorIcon} alt="Иконка статуса регистрации"></img>
        <p className="popup__tooltip-text">{isRegister ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;

