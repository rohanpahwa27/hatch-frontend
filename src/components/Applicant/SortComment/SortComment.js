import React, { Component } from "react"
import "./SortComment.css"
import Radio from "@kiwicom/orbit-components/lib/Radio";

class SortComment extends Component {
    render() {
        return (
            <div id="sortcomment">
                Sort comments by
                <div id="select">
                    <Radio label="Likes" />
                    <Radio label="Most recent" />
                </div>

                {/* <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    
                </FormControl>
                </form> */}
            </div>
        )
    }
}

export default SortComment