const Button = ({ textOnly, children, className, ...props }) => {
  return (
    <button
      className={(textOnly ? "text-button" : "button") + " " + className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
