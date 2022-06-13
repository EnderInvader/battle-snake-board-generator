import React from "react";
import "./StyledDropdown.css";

export function StyledDropdown(props: any) {
	return <div className="styled-dropdown">
		{props.title && <span className="input-title">{props.title}:</span>}
		<select value={props.value} onChange={props.onChange} >
			{props.values.map((value: string) => <option value={value} key={value}>{value}</option>)}
		</select>
	</div>
}