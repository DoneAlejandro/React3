// import logo from './logo.svg';
import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { amber, blueGrey, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function DarkThemeWithCustomPalette() {
	return (
		<ThemeProvider theme={darkModeTheme}>
			<MyApp />
		</ThemeProvider>
	);
}

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			...amber,
			...(mode === "dark" && {
				main: amber[300],
			}),
		},
		...(mode === "dark" && {
			background: {
				default: blueGrey[900],
				paper: blueGrey[900],
			},
		}),
		text: {
			...(mode === "light"
				? {
					primary: grey[900],
					secondary: grey[800],
				}
				: {
					primary: "#fff",
					secondary: grey[500],
				}),
		},
	},
});

function MyApp() {
	//   const theme = useTheme();
	const [messageList, setMessageList] = useState([]);
	const [autor, setAutor] = useState("");
	const [text, setText] = useState("");
	const addMessage = () => {
		let numId = String(Math.round(Math.random() * 100));
		let objMessage = { name: autor, message: text, id: numId };
		setMessageList([...messageList, objMessage]);
	};

	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "background.default",
				color: "text.primary",
				borderRadius: 1,
				p: 3,
				height: "100%",
			}}
		>
			<div className="box">
				<TextField
					helperText="Please enter your name"
					id="demo-helper-text-misaligned"
					sx={{ marginBottom: "20px" }}
					value={autor}
					onChange={(event) => setAutor(event.target.value)}
					label="Name"
				/>
				<TextField
					id="outlined-textarea"
					label="Please enter your message"
					placeholder="Message"
					multiline
					rows={4}
					value={text}
					onChange={(event) => setText(event.target.value)}
					autoFocus={true}
					sx={{ marginBottom: "20px" }}
				/>

				<Button variant="contained" endIcon={<SendIcon />} onClick={addMessage}>
					Send
				</Button>
			</div>
			<div className="div">
				{messageList.map((elem) => {
					return (
						<List
							sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
						>
							<ListItem key={elem.id} alignItems="flex-start">
								<ListItemAvatar>
									<Avatar alt={elem.name} src="#" />
								</ListItemAvatar>
								<ListItemText
									primary={elem.name}
									secondary={
										<React.Fragment>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												{elem.message}
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
						</List>
					);
				})}
			</div>
		</Box>
	);
}
const darkModeTheme = createTheme(getDesignTokens("dark"));
