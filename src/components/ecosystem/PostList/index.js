import React from 'react'
import {Table} from '../../'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PostList = props => {
	const {data:{allPosts, loading}} = props
	if (loading) return <span>Loading</span>
	return (
		<Table striped bordered condensed hover>
			<thead>
				<tr>
					<th>Title</th>
					<th>Created On</th>
				</tr>
			</thead>
			<tbody>
			{
				allPosts.map(p => (
					<tr key={p.id}>
						<td>{p.title}</td>
						<td>{p.createdAt}</td>
					</tr>
				))
			}
			</tbody>
		</Table>
	)
}

export default  graphql(
	gql`query allPosts {allPosts {id, title, createdAt}}`
)(PostList)