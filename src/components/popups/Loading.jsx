export default function Loading({ loading }) {
	return (
		<>
			{loading ? (
				<span className='box loading'>
					<span className='lds-spinner'>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
				</span>
			) : (
				<></>
			)}
		</>
	)
}
