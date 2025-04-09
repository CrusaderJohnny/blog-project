export default function CreateBlog() {
    return (
        <article className="max-w-3xl mx-auto my-8 p-6 border rounded-lg shadow-md font-sans">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Create New Blog Post</h1>
            </header>
            <form className="leading-relaxed text-base">
                <div className="mb-6">
                    <label htmlFor="blogTitle" className="block text-white text-sm font-bold mb-2">
                        Blog Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="blogTitle"
                        type="text"
                        placeholder="Enter blog title"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-white text-sm font-bold mb-2">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
                        id="content"
                        placeholder="Write your blog content here..."
                    />
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
            <footer className="text-center text-gray-500 text-sm mt-8">
                <p>© Your Blog Name</p>
            </footer>
        </article>
    );
};