import React, { forwardRef } from "react";
import { Button, Container } from "@material-ui/core";
import axios from "axios";

import HTMLFlipBook from "react-pageflip";

import style from "./Flipbook.module.css";

const pageContents = [];

const Page = forwardRef((props, ref) => {
	return (
		<div className="page" ref={ref}>
			<div className="page-content">
				<h2 className="page-header">Page header - {props.number}</h2>
				<div className="page-image"></div>
				<div className="page-text" dangerouslySetInnerHTML={{ __html: pageContents[props.number] }}></div>
				<div className="page-footer">{props.number + 1}</div>
			</div>
		</div>
	);
});

const PageCover = forwardRef((props, ref) => {
	return (
		<div className="page page-cover" ref={ref} data-density="hard">
			<div className="page-content">
				<h2>{props.children}</h2>
			</div>
		</div>
	);
});

class Flipbook extends React.Component {
	state = {
		page: 0,
		pageCount: 0,
		flipBook: null,
		prefix: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			pageCount: this.props.location.state.pageCount,
			flipBook: this.props.location.state.flipBook,
			prefix: this.props.location.state.prefix,
		}
		const baseUrl = "http://localhost:8080/pages";
		for (let i = 0; i < this.state.pageCount; i++) {
			const pageUrl = `${baseUrl}/${this.state.flipBook}/${this.state.prefix}${i + 1}.html`;
			console.log(pageUrl);
			axios.get(pageUrl)
				.then(res => {
					pageContents.push(res.data);
				})
				.catch(err => {
					console.error(err);
					console.error(`failed to fetch page contents from ${pageUrl}`);
				})
		}
	}

	nextButtonClick = () => {
		this.flipBook.getPageFlip().flipNext();
	};

	prevButtonClick = () => {
		this.flipBook.getPageFlip().flipPrev();
	};

	onPage = (e) => {
		this.setState({
			page: e.data,
		});
	};
	componentDidMount() {
		this.setState({
		});
	}

	render() {
		return (
			<div>
				<div className={style.flipBookWrapper}>
					<HTMLFlipBook
						width={550}
						height={733}
						autoSize="true"
						size="stretch"
						minWidth={500}
						maxWidth={1000}
						minHeight={400}
						maxHeight={1533}
						maxShadowOpacity={0.5}
						showCover={true}
						mobileScrollSupport={true}
						onFlip={this.onPage}
						className={style.showFlipBook}
						ref={(el) => (this.flipBook = el)}
					>
						<PageCover>BOOK TITLE</PageCover>
						{
							[...Array(this.state.pageCount)].map((v, i) => <Page number={i} key={i}></Page>)
						}
						<PageCover>THE END</PageCover>
					</HTMLFlipBook>
				</div>
				<Container style={{ marginTop: "20px" }}>
					<Button
						type="button"
						variant="contained"
						style={{ color: "#fff" }}
						disabled={this.state.page === 0}
						onClick={this.prevButtonClick}
					>
						Previous page
					</Button>
					[<span>{this.state.page}</span> of
					<span>{this.state.pageCount}</span>]
					<Button
						variant="contained"
						type="button"
						style={{ color: "#fff" }}
						onClick={this.nextButtonClick}
					>
						Next page
					</Button>
				</Container>
			</div>
		);
	}
}

export default Flipbook;
