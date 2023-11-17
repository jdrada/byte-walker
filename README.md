# Byte Walker

Byte Walker is a simple yet powerful web crawler written in TypeScript, designed to efficiently crawl websites and generate detailed reports on the pages visited. This project is perfect for those looking to understand web crawling mechanics or as a starting point for more complex web scraping tasks.

## Features

- Crawls a website starting from a given base URL.
- Counts and tracks the number of visits to each page within the same domain.
- Generates a sorted report of visited pages in a human-readable format.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:

   ```bash
   git clone https://github.com/jdrada/byte-walker.git
   ```


2. Navigate to the project directory:

   ```bash
   cd byte-walker
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

To use Byte Walker, run the following command with your desired base URL:

```bash
npm start <base-url>
```

For example:

```bash
npm start http://example.com
```

This will start the crawling process and generate a report in the `./reports` directory.

## Cleaning Up

To delete all generated reports, run:

```bash
npm run clean-reports
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Juan Drada** - _Initial work_ - [jdrada](https://github.com/jdrada)

See also the list of [contributors](https://github.com/yourusername/byte-walker/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used

