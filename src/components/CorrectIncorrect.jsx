export default function CorrectIncorrect({ isCorrect }) {
	return (
		<>
			{isCorrect === true ? (
				<p>Correct!</p>
			) : isCorrect === false ? (
				<p>Incorrect!</p>
			) : (
				<></>
			)}
		</>
	)
}
