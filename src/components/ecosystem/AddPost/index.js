import React from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose} from 'ramda'
import {Label, Button} from '../../'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {goBack, push} from 'react-router-redux'
import update from 'immutability-helper'

const AddPost = props => {
	const { handleSubmit, pristine, reset, submitting, createPost, cancel } = props
	return (
		<form onSubmit={handleSubmit(createPost)}>
			<div>
				<Label>Title</Label>
				<div>
					<Field name="title" component="input" type="text" placeholder="First Name"/>
				</div>
			</div>
			<div>
				<Label>Content</Label>
				<div>
					<Field name="content" component="input" type="text" placeholder="Last Name"/>
				</div>
			</div>
			<div>
				<Button type="submit" disabled={pristine || submitting}>Submit</Button>
				<Button type="button" disabled={submitting} onClick={cancel}>Cancel</Button>
			</div>
		</form>
	)
}

export default compose(
	connect(
		null,
		dispatch => ({
			onSubmitSuccess: () => dispatch(push('/')),
			cancel: () => {
				console.log('cancelling', goBack())
				return dispatch(goBack())
			}
		})
	),
	reduxForm({form: 'addPost'}),
	graphql(
		gql`mutation createPost($title:String, $content: String) {
			createPost(title: $title, content: $content) {
				id
				title
				content
			}
		}`,
		{
			props: ({ mutate }) => ({
				createPost: (data) => mutate({
					variables: data,
					updateQueries: {
						allPosts: (prev, { mutationResult }) => {
							console.log('mutation result', prev, mutationResult)
							return update(prev, {
								allPosts: {
									$unshift: [mutationResult.data.createPost]
								}
							})
						},
					},
				}),
				
			})
		}
	)
)(AddPost)