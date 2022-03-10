export default function StateInfo({ previousState }) {
	return (
		<div className='state-info'>
			{previousState ? (
				<>
					<h2>{previousState.name}</h2>
					<p>
						<span className='bolder'>Capitol: </span>
						{previousState.capitol}
					</p>
					<p>
						{previousState.description}{' '}
						<a href={previousState.wikipedia} target='_blank' rel='noreferrer'>
							Wikipedia
						</a>
					</p>
				</>
			) : (
				<></>
			)}
		</div>
	)
}
