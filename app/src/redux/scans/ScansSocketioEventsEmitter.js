import Connector from '../SocketConnector.jsx';


class ScansSocketioEventsEmitter {
	constructor() {
        this.connector = new Connector('scans');
	}

	renewCount(project_uuid) {
		this.connector.emit('scans:stats:get', {
			"project_uuid": project_uuid
		});		
	}

}

export default ScansSocketioEventsEmitter;
