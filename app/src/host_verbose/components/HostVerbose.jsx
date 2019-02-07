import React from 'react'

import ScopeComment from '../../common/scope_comment/ScopeComment.jsx'
import PortsTabs from '../presentational/PortsTabs.jsx'

import { Heading } from 'grommet';


class HostVerbose extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'activeTabNumber': null,
			'activePortNumber': null
		}

		this.tabChange = this.tabChange.bind(this);
		this.commentSubmitted = this.commentSubmitted.bind(this);
		this.getFilesHosts = this.getFilesHosts.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (JSON.stringify(this.props.ports) !== JSON.stringify(newProps.ports)) {
			if (typeof this.state.activePortNumber === 'undefined') {
				this.setState({
					activePortNumber: newProps.ports[0].port_number,
					activeTabNumber: 0
				});
			}		
		}
	}

	tabChange(newNumber) {
		this.setState({
			activeTabNumber: newNumber,
			activePortNumber: this.props.ports[newNumber].port_number
		});
	}

	commentSubmitted(comment, _id) {
		this.emitter.requestUpdateHost(comment, _id, this.props.project_uuid, "host");
	}

	getFilesHosts(host, port_number, limit=3, offset=0) {
		this.filesEmitter.requestFilesHosts(
			this.props.project_uuid,
			host,
			port_number,
			limit,
			offset
		);
	}

	render() {
		const { host, ports, project_uuid, files, stats } = this.props;

		return (
			<div>
				<Heading level="2">{host.hostname}</Heading>

				<ScopeComment comment={host.comment}
							  onCommentSubmit={(value) => this.commentSubmitted(value, host.host_id)} />

				<PortsTabs
					project_uuid={project_uuid}
					ports={ports}
					target={host.hostname}
					target_id={host.host_id}
					activeTabNumber={this.state.activeTabNumber}
					tabChange={this.tabChange}
					files={files}
					stats={stats}
					requestMoreFiles={this.getFilesHosts}
				/>
			</div>				  
		)
	}
}

export default HostVerbose;
