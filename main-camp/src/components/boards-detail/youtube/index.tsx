import styles from './style.module.css'
import YouTube, { YouTubeProps } from 'react-youtube'
import { Modal } from 'antd'

interface IBoardDetailYoutube {
    youtubeUrl: string | null | undefined
}
const BoardDetailYoutube = (props: IBoardDetailYoutube) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    
    // const showError = () => {
    //     Modal.error({
    //         title: '유튜브 실행에 오류가 발생했습니다!',
    //         // content: 'some messages...some messages...',
    //         mask: false
    //     });
    // }

    const opts: YouTubeProps['opts'] = {
        height: '464',
        width: '822',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    if (props.youtubeUrl?.includes("watch?v=")) {
        return (
            <div className={`${styles.detail_video} flex_row flex_justi_center`}>
                <YouTube videoId={props.youtubeUrl?.split("watch?v=")[1]} opts={opts} onReady={onPlayerReady}/>
            </div>
        )
    } else {
        return <></>
    }
}

export default BoardDetailYoutube