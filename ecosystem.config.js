module.exports = {
    apps: [{
        name: "app",
        script: "app.js",
        max_memory_restart: "800M",
        instances: "1",
        exec_mode: "cluster",
        watch_delay: 1000,
        watch: ["config", "app.js", "routes", "services", "models", "apis"],
        ignore_watch: ["node_modules", "newrelic_agent.log"],
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
    }],
}
