const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        // for every single array a div is returned for that point of snake each point of indexi is also given 2 percent dimensions
        const style = {
          left: `${dot[0]}%`, // first top 0 percent second top 2 percent that is size of one dot
          top: `${dot[1]}%`, // can use the same way to make some app like twitter or facebook when each component need differnt style
        };
        return (
          <div
            style={{
              position: "absolute",
              width: "2%",
              height: "2%",
              backgroundColor: "#000",
              border: "1px solid #fff",
              zIndex: "10",
              ...style, // spread operator to add style to div
            }}
            key={i}
          ></div>
        );
      })}
    </div>
  );
};
export default Snake;
