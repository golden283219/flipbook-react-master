import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import {
	Button,
	Grid,
	Select,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@material-ui/core";
import Files from "react-butterfiles";

import style from "./FileUpload.module.css";

function FileUpload() {
	const [files, setFiles] = useState("");
	const [errors, setErrors] = useState("");
	const [ref, setRef] = useState();
	const [flipBookRes, setFlipbookRes] = useState();

	const [pageQuality, setPageQuality] = useState(
		"High quality large file size"
	);
	const [pageRange, setPageRange] = useState("all-pages");

	const setPageRangeHandler = (event) => {
		setPageRange(event.target.value);
	};

	const pageQualityChangeHandler = (event) => {
		setPageQuality(event.target.value);
	};

	const fileName = files && files[0].name;

	const uploadPdf = async () => {
		const data = new FormData();
		data.append('pdf', files[0].src.file)
		axios.post('http://localhost:8080/flipbook', data)
			.then(res => {
				setFlipbookRes(res.data);
				console.log(flipBookRes);
				setRef("/flipbook");
			}).catch(error => {
				console.error(error);
			});
	}

	if (ref === "/flipbook") {
		return (
			<Redirect to={{
				pathname: "/flipbook",
				state: {
					flipBook: flipBookRes.flipbook,
					prefix: flipBookRes.prefix,
					pageCount: flipBookRes.pageCount
				}
			}} />
		)
	} else {
		return (
			<div className={style.fileUploadWrapper}>
				<Files
					multiple={false}
					maxSize="2mb"
					multipleMaxCount={1}
					accept={["application/pdf", "image/jpg", "image/jpeg"]}
					onSuccess={(files) => setFiles(files)}
					onError={(errors) => setErrors(errors)}
				>
					{({ browseFiles, getDropZoneProps, getLabelProps }) => (
						<>
							<label {...getLabelProps()} className={style.uploadHeader}>
								Select a file
						</label>
							<div
								{...getDropZoneProps({ className: style.myDropZone })}
								onClick={browseFiles}
							>
								<p>
									Drag and drop a file here or <button>click here</button>
								</p>
							</div>
							<p className={style.divider}>
								<span>OR</span>
							</p>
							<Grid container direction="row" className={style.Grid}>
								<Grid item xs={7}>
									<input
										type="text"
										placeholder="Choose a file"
										value={fileName}
									/>
									<Button
										variant="contained"
										color="primary"
										onClick={browseFiles}
									>
										Browse file
								</Button>
								</Grid>
								<Grid item xs={5}></Grid>
							</Grid>

							<Grid container direction="row" className={style.Options}>
								<Grid item xs={6}>
									<h3>Page quality and size</h3>
									<Select
										variant="standard"
										color="primary"
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={pageQuality}
										defaultValue={"High quality large file size"}
										onChange={pageQualityChangeHandler}
									>
										<MenuItem value={"High quality large file size"}>
											High quality large file size
									</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
									<Button variant="contained" color="primary">
										Set mobile qulaity
								</Button>
								</Grid>
								<Grid item xs={6}>
									<h3>The page range to import </h3>
									<RadioGroup
										aria-label="quiz"
										name="quiz"
										value={pageRange}
										onChange={setPageRangeHandler}
									>
										<Grid container direction="row" alignItems="center">
											<Grid item xs={6} direction="column" justify="space-evenly">
												<FormControlLabel
													label="All pages"
													value="all-pages"
													control={<Radio />}
												/>
											</Grid>
											<Grid item xs={6}>
												<p> 1- 13</p>
											</Grid>
										</Grid>
										<Grid container direction="row" alignItems="center">
											<Grid item xs={6}>
												<FormControlLabel
													value="custom"
													label="Custom"
													control={<Radio />}
												/>
											</Grid>
											<Grid item xs={6}>
												<input
													type="text"
													placeholder="Example: 1-30, 1-20, 1-15"
													disabled={pageRange && pageRange !== "custom"}
												/>
											</Grid>
										</Grid>
									</RadioGroup>
								</Grid>
							</Grid>

							<ol>
								{errors &&
									errors.map((error) => (
										<li key={error.file.name}>
											{error.file.name} - {error.type}
										</li>
									))}
							</ol>
						</>
					)}
				</Files>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					className={style.ImportButton}
					onClick={uploadPdf}
				>
					Import now
			</Button>
			</div>
		);
	}
}

export default FileUpload;
