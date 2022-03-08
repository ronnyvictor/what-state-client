import checkIcon from '../assets/check-icon.svg'
import xIcon from '../assets/x-icon.svg'

export default function CorrectIncorrect({ isCorrect }) {
	return (
		<>
			{isCorrect === true ? (
				<div className='correct-incorrect'>
					<img src={checkIcon} alt='check icon' />
					<p className='correct'>Correct!</p>
				</div>
			) : isCorrect === false ? (
				<div className='correct-incorrect'>
          <img src={xIcon} alt='x icon' />
					<p className='incorrect'>Incorrect!</p>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
