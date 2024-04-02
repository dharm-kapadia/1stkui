class CloudEvent {
  constructor(id, specVersion, type, source, subject, time, relatedProcess, relatedSubProcess, dataContentType, data, processingStatus) {
    this.id = id;
    this.specVersion = specVersion;
    this.type = type;
    this.source = source;
    this.subject = subject;
    this.time = time;
    this.relatedProcess = relatedProcess;
    this.relatedSubProcess = relatedSubProcess;
    this.dataContentType = dataContentType;
    this.data = data;
    this.processingStatus = processingStatus;
  }
}

export default CloudEvent;
