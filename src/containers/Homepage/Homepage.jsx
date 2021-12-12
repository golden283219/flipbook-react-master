import React, { Component } from "react";

import FileUpload from "../../components/FileUploader/FileUpload";
import { Modal } from "@material-ui/core";

import style from "./Homepage.module.css";

export class Homepage extends Component {
	state = {
		showUploader: true,
	};

	showUploaderTogglers = () => {
		this.setState({ showUploader: !this.state.showUploader });
	};
	render() {
		return (
			<div className={style.homePage}>
				<h1>The Best Flipbook Maker You Have Seen</h1>
				<button
					className={style.importButton}
					onClick={this.showUploaderTogglers}
				>
					Import file
				</button>
				<Modal
					open={this.state.showUploader}
					onClose={this.showUploaderTogglers}
				>
					<FileUpload />
				</Modal>
			</div>
		);
	}
}

export default Homepage;
