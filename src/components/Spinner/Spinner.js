import s from "./Spinner.module.scss";

const Spinner = ({size=42}) => {
    return(
        <div className={s.spinnerWrapper}>
            <div className={s.spinner} style={{ width: size, height: size }}>
                <svg viewBox="22 22 44 44">
                    <circle className={s.circle} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
                </svg>
            </div>
        </div>
    )
}

export default Spinner;