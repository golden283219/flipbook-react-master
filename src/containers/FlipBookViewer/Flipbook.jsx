import React, { Component } from "react";

import FlipbookComp from "../../components/Flipbook/Flipbook";

import style from "./Flipbook.module.css";

export class Flipbook extends Component {
	render() {
		return (
			<div className={style.FlipbookParent}>
				<FlipbookComp {...this.props} />
			</div>
		);
	}
}

export default Flipbook;
