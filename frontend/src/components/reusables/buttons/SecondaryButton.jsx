export default function SecondaryButton({ name , onClick}) {
      return (<>
            <button type="submit" className="
            w-full
            rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" onClick={onClick}>{name}</button>
      </>)
}