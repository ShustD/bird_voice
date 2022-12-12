export function copy(region, instance){

  const segmentDuration = (region.end - region.start) + 0.01

  const originalBuffer = instance.backend.buffer;
  const emptySegment = instance.backend.ac.createBuffer(
    originalBuffer.numberOfChannels,
    segmentDuration * originalBuffer.sampleRate,
    originalBuffer.sampleRate
  );
  for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
    let chanData = originalBuffer.getChannelData(i);
    let emptySegmentData = emptySegment.getChannelData(i);
    let mid_data = chanData.subarray( region.start * originalBuffer.sampleRate, region.end * originalBuffer.sampleRate);
    emptySegmentData.set(mid_data);
}
  return emptySegment
}

export const bufferToWave = (abuffer, offset, len) => {

    const numOfChan = abuffer.numberOfChannels
    const length = len * numOfChan * 2 + 44
    const buffer = new ArrayBuffer(length)
    const view = new DataView(buffer)
    let channels = [] 
    let sample
    let pos = 0

    setUint32(0x46464952);                         
    setUint32(length - 8);                         
    setUint32(0x45564157);                         
    setUint32(0x20746d66);                         
    setUint32(16);                                 
    setUint16(1);                                  
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); 
    setUint16(numOfChan * 2);                      
    setUint16(16);                                 

    setUint32(0x61746164);                         
    setUint32(length - pos - 4);                   

    for(let i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));

    while(pos < length) {
      for(let i = 0; i < numOfChan; i++) {             
        sample = Math.max(-1, Math.min(1, channels[i][offset]))
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0
        view.setInt16(pos, sample, true);          
        pos += 2;
      }
      offset++                                     
    }

    return new Blob([buffer], {type: "audio/mpeg"});

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }