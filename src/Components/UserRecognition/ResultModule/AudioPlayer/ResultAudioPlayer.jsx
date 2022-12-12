import React, { useState, useEffect, useMemo } from "react"
import s from './ResultAudioPlayer.module.css'


export const ResultAudioPlayer = (props) => {
    const audioElement = useMemo(() => new Audio(props.url), [props.url])
    const duration = audioElement.duration
    const [trackProgress, setTrackProgress] = useState(0);
    const [volume, setVolume] = useState(1)
    const [savedVolume, setSavedVolume] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false);
    let progressMin = Math.trunc(trackProgress / 60)
    let progressSec = Math.round(trackProgress % 60)
    let durationMin = Math.trunc(duration / 60) || 0
    let durationSec = Math.trunc(duration % 60) || 0

    useEffect(() => {
        if (isPlaying) {
            const intervalTimer = setInterval(() => {
                setTrackProgress(audioElement.currentTime)
            }, 1000);
            return () => {
                clearInterval(intervalTimer);
            };
        }
    }, [isPlaying, audioElement.currentTime]);

    const play = () => {
        audioElement.play()
        setIsPlaying(true)
    }
    const pause = () => {
        audioElement.pause()
        setIsPlaying(false)
    }

    const onVol = (value) => {
        audioElement.volume = value;
        setVolume(audioElement.volume)
      }
    const muteVolume = () => {
        setSavedVolume(volume)
        onVol(0)
    }
    const percentOfVol = `${audioElement.volume * 100}%`

    const volumeStyling = {
    
        'background':`-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${percentOfVol},  #ffffff),
         color-stop(${percentOfVol}, #777))`         
  }
    return (
        <div className={s.audio}>

            <div className={s.controls}>
                <div className={s.controlsLeft}>
                    <i className="material-icons" onClick={isPlaying ? pause : play}>{isPlaying ? 'pause' : 'play_arrow'} </i>
                    <span>{`${progressMin}:${progressSec < 10 ? `0${progressSec}` : progressSec}
      /${durationMin}:${durationSec < 10 ? `0${durationSec}` : durationSec}`}</span>
                </div>
                <div className={s.controlsRight}>
                    <i className="material-icons" onClick={() => volume === 0 ? onVol(savedVolume)
                        : muteVolume()}>{volume === 0 ? 'volume_off' : 'volume_up'}</i>
                    <input
                        type="range"
                        value={volume}
                        step="0.01"
                        min="0"
                        max='1'
                        className={s.volume}
                        onChange={(e) => onVol(e.target.value)}
                        style={volumeStyling}
                    />
                </div>
            </div>
        </div>
    )
}