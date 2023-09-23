const ProgressBar = ({ progress }) => {

  const colors = [
    'rgb(170, 240, 240)',
    'rgb(150, 55, 238)',
    'rgb(230, 119, 156)',
    'rgb(180, 247, 81)'
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return (
      <div>
         <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
      </div>
    );
  }
  
  export default ProgressBar ;
 