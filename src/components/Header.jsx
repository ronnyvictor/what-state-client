export default function Header({ handleGoogleLogin, user }) {
	return (
		<>
			<h1>What State is This?</h1>
			{!user ? (
				<button onClick={handleGoogleLogin}>Sign in with Google</button>
			) : (
				<>
				<button>High Scores</button>
				<p>{user.displayName}</p>
				</>
			)}
		</>
	)
}
