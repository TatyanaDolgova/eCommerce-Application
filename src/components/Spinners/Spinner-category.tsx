const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="200"
      height="200"
      style={{
        shapeRendering: 'auto',
        display: 'block',
        background: 'transparent',
        margin: '0 auto',
        marginTop: '50px',
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      data-testid="spinner-test"
    >
      <g>
        <g>
          <circle fill="#89ba16" r="4" cy="50" cx="60">
            <animate
              begin="-0.67s"
              keyTimes="0;1"
              values="95;35"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
            <animate
              begin="-0.67s"
              keyTimes="0;0.2;1"
              values="0;1;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="fill-opacity"
            ></animate>
          </circle>
          <circle fill="#89ba16" r="4" cy="50" cx="60">
            <animate
              begin="-0.33s"
              keyTimes="0;1"
              values="95;35"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
            <animate
              begin="-0.33s"
              keyTimes="0;0.2;1"
              values="0;1;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="fill-opacity"
            ></animate>
          </circle>
          <circle fill="#89ba16" r="4" cy="50" cx="60">
            <animate
              begin="0s"
              keyTimes="0;1"
              values="95;35"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
            <animate
              begin="0s"
              keyTimes="0;0.2;1"
              values="0;1;1"
              dur="1s"
              repeatCount="indefinite"
              attributeName="fill-opacity"
            ></animate>
          </circle>
        </g>
        <g transform="translate(-15 0)">
          <path
            transform="rotate(90 50 50)"
            fill="#008374"
            d="M50 50L20 50A30 30 0 0 0 80 50Z"
          ></path>
          <path fill="#008374" d="M50 50L20 50A30 30 0 0 0 80 50Z">
            <animateTransform
              keyTimes="0;0.5;1"
              values="0 50 50;45 50 50;0 50 50"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </path>
          <path fill="#008374" d="M50 50L20 50A30 30 0 0 1 80 50Z">
            <animateTransform
              keyTimes="0;0.5;1"
              values="0 50 50;-45 50 50;0 50 50"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </path>
        </g>
        <g></g>
      </g>
      <></>
    </svg>
  );
};

export default Spinner;
