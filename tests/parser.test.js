import Post from './dummy/models/Post'
import { Model } from '../src'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

describe('Parser', () => {
  Model.$http = axios
  let axiosMock = new MockAdapter(axios)

  beforeEach(() => {
    axiosMock.reset()
  })

  test('it builds a simple query to test new delimiter', () => {
    const post = Post
      .include('comments', 'comments.reacts')
      .where('comments.comment', 'A nice, paragraph')
      .whereIn('something', ['value1', 'value2'])
      .where('status', 'ACTIVE')

    const query = '?include=comments,comments.reacts&filter[comments.comment]=A nice, paragraph&filter[something]=value1|value2&filter[status]=ACTIVE'

    expect(post._builder.query()).toEqual(query)
  })
})