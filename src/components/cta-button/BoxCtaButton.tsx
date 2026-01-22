import "./BoxCtaButton.scss";

const CtaButton = () => {
  return (
    <button className="btn cube cube-hover" type="button">
      <div className="bg-top">
        <div className="bg-inner"></div>
      </div>
      <div className="bg-right">
        <div className="bg-inner"></div>
      </div>
      <div className="bg">
        <div className="bg-inner"></div>
      </div>
      <div className="text">Zaplanuj Spotkanie</div>
    </button>
  );
};

export default CtaButton;
