export default function Header({ handleGoogleLogin, user, setUserScores, setHsPopup }) {

	return (
		<>
			<h1>What State is This?</h1>
			{!user ? (
				<button onClick={handleGoogleLogin}>Sign in with Google</button>
			) : (
				<>
					<button onClick={()=> setHsPopup(true)}>High Scores</button>
				</>
			)}
		</>
	)
}
