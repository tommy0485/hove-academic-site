import React, { useState } from 'react';

const emailAddress = 'aaron.hove@umontana.edu';

const ContactForm: React.FC = () => {
	const [message, setMessage] = useState('');
	const [buttonText, setButtonText] = useState('Copy Email');

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(emailAddress);
			setButtonText('Copied!');
			setMessage(`Email address "${emailAddress}" copied to clipboard.`);
			setTimeout(() => {
				setButtonText('Copy Email');
				setMessage('');
			}, 3000);
		} catch (err) {
			setMessage('Failed to copy email. Please copy it manually.');
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Get In Touch</h2>
			<p className="text-gray-700 dark:text-gray-300 mb-6">
				The best way to contact me is via email. Click the button below to copy the address, or use the direct mail link.
			</p>

			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<button
					onClick={handleCopy}
					className="flex-1 w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
					aria-label="Copy email address to clipboard"
					type="button"
				>
					{buttonText}
				</button>
				<a
					href={`mailto:${emailAddress}`}
					className="flex-1 w-full sm:w-auto text-center px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg shadow-md hover:bg-red-50 dark:hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					aria-label={`Send an email to ${emailAddress}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Send Email Directly
				</a>
			</div>

			{message && (
				<p
					className={`mt-4 p-3 rounded-md text-sm ${
						message.includes('copied') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
					}`}
					role="status"
					aria-live="polite"
				>
					{message}
				</p>
			)}

			<p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
				**Email Address:** <code className="text-red-600 dark:text-red-400">{emailAddress}</code>
			</p>
		</div>
	);
};

export default ContactForm;