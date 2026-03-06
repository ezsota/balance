export default function FilterBox(props) {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            props.setFilters({
                from: event.target.from.value,
                to: event.target.to.value
            });
        }}>
            <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                <input type="date" name="from" className="p-1" />
                <input type="date" name="to" className="p-1" />
                <button className="btn btn-success bg-green py-1">Apply Filters</button>
            </div>
        </form>
    );
};