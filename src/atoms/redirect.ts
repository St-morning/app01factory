export default function redirect(url: string) {
	return {
		props: {} as any,
		redirect: {
			statusCode: 302,
			destination: url,
			basePath: true
		}
	};
}
