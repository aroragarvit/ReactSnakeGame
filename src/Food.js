const Food = ({ food }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "2%",
        height: "2%",
        backgroundColor: "red",
        border: "1px solid #fff",
        zIndex: "2",
        left: `${food[0]}%`,
        top: `${food[1]}%`,
      }}
    ></div>
  );
};
export default Food;
