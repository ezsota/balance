export default function FilterBox(props) {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            props.setFilters({
                from: event.target.from.value,
                to: event.target.to.value
            });
        }}>
            <input type="date" name="from" />
            <input type="date" name="to" />
            <button>Apply Filters</button>
        </form>
    );
};