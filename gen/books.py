import os
import urllib

import jinja2
import webapp2

from xml.dom import minidom

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

class Book:
    def __init__(self, author, title):
        self.author = author
        self.title = title

class UserBooks:
    def __init__(self, books_read, books_reading, 
            books_to_read):
        self.books_read = books_read if books_read else []
        self.books_reading = books_reading if books_reading else []
        self.books_to_read = books_to_read if books_to_read else [] 
        
class MainPage(webapp2.RequestHandler):
    def get(self):
        try:
            user_books = get_books()
            template_values = {
                'books_read': user_books.books_read,
                'books_reading': user_books.books_reading,
                'books_to_read': user_books.books_to_read
            }
            template = JINJA_ENVIRONMENT.get_template('templates/books.html')
            self.response.write(template.render(template_values))
        except:
            template = JINJA_ENVIRONMENT.get_template('templates/error.html')
            self.response.write(template.render())

def get_child_text(node, child_name):
    """ 
    Get the text data of a child node.
    """
    text_node = node.getElementsByTagName(child_name)[0].childNodes[0]
    if text_node.nodeType == text_node.TEXT_NODE: 
        return text_node.data
    raise Exception

def get_books(shelf=None):
    books_read = []
    books_reading = []
    books_to_read = []

    api_key = 'ICL1VIoYITddcBlZAAVmwA'
    user = '22032624-andrew-nguyen'
    params = {'id': user, 'key': api_key, 'sort': 'title', 'per_page': 200}
    if shelf is not None:
        params[shelf] = shelf

    base_url = books_url = 'http://www.goodreads.com/review/list?format=xml&v=2&' + urllib.urlencode(params)

    page = 1
    go = True
    while go:
        xml = urllib.urlopen(books_url)
        dom = minidom.parse(xml)

        reviews = dom.getElementsByTagName('review') 

        for review in reviews:
            book = review.getElementsByTagName('book')[0]
            title = get_child_text(book, 'title')
            athr_node = book.getElementsByTagName('authors')[0].\
                        getElementsByTagName('author')[0]
            author = get_child_text(athr_node, 'name')
            for shelf in review.getElementsByTagName('shelf'):
                shelf_name = shelf.getAttribute('name')
                if shelf_name == 'to-read':
                    books_to_read.append(Book(author, title))
                    break
                elif shelf_name == 'read':
                    books_read.append(Book(author, title))
                    break
                elif shelf_name == 'currently-reading':
                    books_reading.append(Book(author, title))
                    break
        rvws_elem = dom.getElementsByTagName('reviews')[0]
        if (int(rvws_elem.getAttribute('end')) <
                int(rvws_elem.getAttribute('total'))):
            page += 1
            books_url = base_url + '&page=' + str(page)
        else:
            go = False

    return UserBooks(books_read, books_reading, books_to_read)
    

app = webapp2.WSGIApplication([
    ('/books.html', MainPage),
], debug=True) # TODO remote debug
