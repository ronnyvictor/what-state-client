export default function Header({
	handleGoogleLogin,
	user,
	setHsPopup,
	handleSignOut,
}) {
	const handleHighScores = () => {
		setHsPopup(true)
	}

	return (
		<>
			<h1>What State is This?</h1>
			{!user ? (
				<button onClick={handleGoogleLogin}>Sign in with Google</button>
			) : (
				<div>
					<button onClick={handleHighScores}>Saved Scores</button>
					<button onClick={handleSignOut}>Sign Out</button>
				</div>
			)}
		</>
	)
}
