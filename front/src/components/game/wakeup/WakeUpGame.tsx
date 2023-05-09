import WakeUpGameMobile from "./WakeUpGameMobile";
import WakeUpGameWeb from "./WakeUpGameWeb";

const WakeUpGame = () => {
  const detectMobileDevice = (agent: string) => {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    console.log(agent);
    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  const isMobile = detectMobileDevice(window.navigator.userAgent);
  

  return (
    <div id="content">
      <div id="time-box">{} 초</div>
      <div id="game-description">
        {isMobile ? "알을 터치하여 럭퀴를 깨워주세요" : "스페이스 바를 눌러 럭퀴를 흔들어 깨워주세요"}
      </div>
      {isMobile ? <WakeUpGameMobile /> : <WakeUpGameWeb />}
    </div>
  );
};
export default WakeUpGame;
