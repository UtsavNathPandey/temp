job('BoreHoleDataMgmt/wfw-search-filters') {
    scm {
        git {
            remote {
                url 'git@git.openearth.community:BoreHoleDataMgmt/wfw-search-filters.git'
                credentials 'Gitlab'
            }
            branch 'develop'//this will be modified to branch
            configure { gitScm ->
                gitScm / 'extensions' << 'hudson.plugins.git.extensions.impl.UserExclusion' {
                    excludedUsers 'Jenkins'
                }
            }
        }
    }
    wrappers {
        nodejs {
            nodeJSInstallationName 'NodeJS 6.10.2'
            configId '9b5dbe9b-2cb4-47f2-8e9d-5dc946576e6b'
        }
    }
    triggers {
        scm 'H/5 * * * *'
    }
    steps {
        shell 'npm version prerelease && npm publish'
    }
    publishers {        
        git {
            pushOnlyIfSuccess()
            branch('origin', 'develop')//this will be modified to branch to build
        }
    }
}
