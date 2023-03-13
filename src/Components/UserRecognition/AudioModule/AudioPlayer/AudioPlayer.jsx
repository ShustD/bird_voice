import React from "react";
import { useState, useMemo, useEffect, useRef } from 'react';
import s from './AudioPlayer.module.scss'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import SpectrogramPlugin from 'wavesurfer.js/src/plugin/spectrogram/index.js'
import { bufferToWave, copy } from "../../cut";

export const AudioPlayer = (props) => {

    const [url, setUrl] = useState(props.url)
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [savedVolume, setSavedVolume] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(null)
    const audioElement = useMemo(() => new Audio(url), [url])
    const containerRef = useRef()
    const spectogramRef = useRef()
   
    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: containerRef.current,
            backend: 'MediaElement',
            height: 50,
            progressColor: 'rgba(2, 83, 234, 1)',
            responsive: true,
            waveColor: 'rgba(20, 102, 255, 0.75)',
            cursorColor: 'transparent',
            plugins: [
                RegionsPlugin.create({
                    maxRegions: 1,
                    minLength: 6,
                    maxLength: 180,
                    dragSelection: {
                        drag: true,
                        resize: true
                    }
                }),
                SpectrogramPlugin.create({
                    container: spectogramRef.current,
                    labels: true,
                    height: 256,
                })
            ]
        })
        if (props.url) {
            waveSurfer.load(audioElement)
        }

        waveSurfer.on('ready', () => {
            setTrackDuration(waveSurfer.getDuration())
        })

        waveSurfer.on('region-click', (region, e) => {
            e.stopPropagation();
            if (e.ctrlKey) {
                region.remove()
            }
        });
        waveSurfer.on('region-created', (region, e) => {
            region.color = 'rgba(255, 255, 255, 0.3)'
            setCurrentRegion(region)
        });

        return () => {
            waveSurfer.destroy()
        }
    }, [audioElement, props])

    const trim = (e) => {
        e.preventDefault()
        currentRegion.remove()
        const cutRegion = copy(currentRegion, currentRegion.wavesurfer)
        const arraybuffer = bufferToWave(cutRegion, 0, cutRegion.length)
        props.changeUrl(URL.createObjectURL(arraybuffer), arraybuffer)
    }

    let progressMin = Math.trunc(trackProgress / 60)
    let progressSec = Math.round(trackProgress % 60)
    let durationMin = Math.trunc(trackDuration / 60) || 0
    let durationSec = Math.trunc(trackDuration % 60) || 0

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

        'background': `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${percentOfVol},  #A8BFEC),
         color-stop(${percentOfVol}, #777))`
    }

    if (url !== props.url) {

        setUrl(props.url)
        pause()
        setTrackProgress(0)
    }

    return (
        <div>
            <div className={s.progressBar}>
                <div ref={containerRef} />
                <div ref={spectogramRef} />
            </div>
            <div className={s.controls}>
                <div className={s.controlsLeft}>
                    <label className={s.but} htmlFor="play">
                        <i className="material-icons" >{isPlaying ? 'pause' : 'play_arrow'} </i>
                    </label>
                    <input onClick={isPlaying ? pause : play} id="play" type="button" />
                    <span>{`${progressMin}:${progressSec < 10 ? `0${progressSec}` : progressSec}
                    /${durationMin}:${durationSec < 10 ? `0${durationSec}` : durationSec}`}</span>
                </div>
                <div className={s.controlsRight}>
                    <label className={s.but} htmlFor="content_cut">
                        <i className="material-icons" onClick={(e) => currentRegion ? trim(e) : null}>content_cut</i>
                    </label>
                    <input onClick={(e) => currentRegion ? trim(e) : null} id="content_cut" type="button" />
                    <label className={s.but} htmlFor="volume">
                        <i className="material-icons" >{volume === 0 ? 'volume_off' : 'volume_up'}</i>
                    </label>
                    <input onClick={() => volume === 0 ? onVol(savedVolume) : muteVolume()} id="volume" type="button" />

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